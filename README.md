# Shopify Developer Intern Challenge - Winter 2019 
 
 ### API Endpoint: [https://shopify.adi.run/rest/v1/shop]
 ## Checklist 
 - [x] Basic 
 - [x] Extra Credit
    - [x] Secure (Probably not production grade?)
    - [x] Full CRUD (a few things are hacky, more on that later or see API Documentation)
    - [x] [API Documentation](https://shopify.adi.run/docs) that doesn't suck? (Warning! it may or may not)
    - [ ] Tests (ran out of time 🤥)
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
2. Deployment `api` with container `rest` running a sample node.js application and `cloudsql-proxy` as a sidecar container, updated image of the `rest` automagically with cloudbuild throughout development
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
