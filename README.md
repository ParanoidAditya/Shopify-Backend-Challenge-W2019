# Shopify Developer Intern Challenge - Winter 2019 
 
 ### API Endpoint: [https://shopify.adi.run/rest/v1/shop]
 ## Checklist 
 - [x] Basic 
 - [x] Extra Credit
    - [x] Secure (Probably not production grade?)
    - [x] Full CRUD (a few things are hacky, more on that later or see API Documentation)
    - [x] [API Documentation](https://shopify.adi.run/docs) that doesn't suck? (Warning! it may or may not)
    - [ ] Tests 🤥
 - [x] Extra _extra_ Credit
    - [x] K8s Deployment
- [x] _Extraaa_ Things Nobody asked for but I did anyway for fun
    - [x] ingress-nginx
    - [x] [Grafana Dashboard](http://grafana.adi.run)
    - [x] BatchCronJob to sanitize the database every hour
    - [x] external-dns with cert-manager to auto provision LE TLS certs
    - [X] Horizontal Pod Autoscaling

# Lets start with K8s and make our way up the list (just like I did with this challenge).

 - Due to the relationship between shops, products, orders and line items. I knew I had to use a relational database. So I went with __Google CloudSQL__ for the deployment

## The Cluster

Regional cluster in `northamerica-northeast1`  with a single Node in each zone, with default api scopes with the exception/addition of access to `Cloud Debugger` and HTTP load Balancer enabled

## kubectl get deployments,svc,ing
1. `ingress-nginx`, `external-dns`, `cert-manager`, `grafana` and `prometheus` deployed with helm (easy)
2. Deployment `api` with container `rest` running a sample node.js application and `cloudsql-proxy` as an ambassador container, updated image of the `rest` automagically with cloudbuild throughout development
3. Deployment `docs` with containers [git-sync](https://github.com/kubernetes/git-sync) & nginx to serve the static api documentation.

![](https://s3.ca-central-1.amazonaws.com/paranoidaditya/shopify/deployments.svg)
4. [shopify.adi.run](https://shopify.adi.run/) ingress with TLS termination at the ingress-nginx-controller


    1. Path `/docs` goes to the docs service
    2. Path `/rest` goes to the api service

## CI/CD because why not?
![](https://s3.ca-central-1.amazonaws.com/paranoidaditya/shopify/CD.svg)

After the k8s infrastructure was bootstrapped, I setup this simple CI/CD pipeline to update the api service within a few seconds everytime I push to the repo. And NO, I do not develop in production but I may have this time.

Tests (test steps currently commented out) would have been nice to show off and make this a better solution overall

## The API

I tried to follow and replicate REST-API pattern at [MixMax Developer](https://developer.mixmax.com/).

I used [Sequilize ORM](http://docs.sequelizejs.com/) to model my Schema and interact with the DB

Working with Node.js again after 4 straight months of straight GoLang was a little harder than I anticipated. (Checkout the controllers to see me struggle with async)

The relationship modeling between Shops, Products and Order was easy to comprehend. 

Where I got stuck for a while was `Products & Orders both have many line items`. 

At first I assumed LineItem in case of a product is a variant but then the question said `value of a line item should map to the value of the product it represents`, So in my implementation a product can have multiple lineItems but updating a product will modify all the values of it's LineItems to the product's value and creating a new Product via the rest API will result in a single lineItem.

In case of orders, LineItem was easier to comprehend and implement. 

The API does not implement interacting with a LineItem directly as I could not make sense of why it'll be required 😬

In the later half of working on this I really hated myself for not writing tests, as to verify I did not break any previous functionality. Instead I improvised and used Postman collections to run all 5 API calls for Shop, Order and Product to verify everything worked as intended. 

Things that are `hacky`
- Creating an order (See controller, mixing asynchronous and synchronous logic with `hacks` in place which will make any js dev hate me)
- Deleting a Shop, Order or Product will leave the data associated with them in the other tables intact. 
Example: deleting a shop will leave all its orders and products still in the DB with a shopId: `null`

Things that dont work
- Updating an order, I did not have enough time on hand to implement this

By no means the API is perfect, but I really enjoyed working on this challenge, especially the yet-unexplored sql part
