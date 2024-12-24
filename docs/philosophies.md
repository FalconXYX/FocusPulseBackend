## Philosophies

This starter project was designed from the ground-up with the following engineering principles in mind.

### Zero-Ops Burden

For hobbyists and money-conscious start-ups, the last thing you want to be doing is thinking about managing operations. A serverless-based architecture was chosen in order to minimize the amount


#### Lambdas Handle Scaling

Lambdas by their very nature handle scaling, without needing to consider maintenance of servers, etc.

#### CI and CD

One important aspect of a no-ops software system is ensuring that when code changes are approved and merged back into the repository, that the deployment process is just as seamless. This is known as continuous delivery. Via continuous integration systems that all major version control websites support (eg. GitHub, GitLab), this can be done automatically. The starter project contains workflows for both GitHub and GitLab's built-in CI that will deploy changes to `master` to staging, and a script to promote changes to production.

### Multiple Deployment Environments

The vast majority of starter projects provide the base framework for building a web application, but are not prescriptive about real-world deployment situations, such as a clean split between development, staging, and production. This starter project includes this concept at a fundamental level to ensure a) the entire stack is aware of this divide, and b) the idea of multiple deployment environments does not have to be shoehorned in as a second-thought.

### Anti-Foot Gun

The hardest part of designing a scalable software system is considering not just what you need at the moment, but what you might need in the future. This starter project is designed to be prescriptive enough so as to not get into these situations in the first place.

#### Serverless Promotes Stateless Design

Because functions are inherently stateless, writing backend endpoints for a serverless infrastructure forces the developer to think about stateless design. Keeping track of state (a subset of mutability in general) is often difficulty to reason about and a common source of bugs; with less state management, softwre systems become simpler to write and easier to maintain.

### Extensibility

#### Multiple Projects in One Monorepo

The architecture of this starter project allows for several "projects" to exist within one repo, promoting code reuse. When the lambdas are packaged up and deployed, however, each function is compiled independently so that they each contain exclusively the dependencies that _that specific function_ relies on, rather than the sum of all dependencies.

### Data Layer

#### Audit Logging

Audit logs are ofte an oafterthought, but all web applications greatly benefit from the that audit logs provid, whether for the purpose of internal accountability, or by surfacing portions of it externally to serve as a "revision history" on various resources.

#### Soft Deletion

When resources are deleted in a web application, it's useful to not explicitly `DELETE` the rows from the database in case information needs to be recovered for auditability, or reverted in case it was done as a result of user error. This concept is known as "soft deletion".


#### Metadata Fields by Default

It's generally good practice to include fields like `updatedAt` and `createdAt` for debugging purposes in all models of your app. This starter project creates a base model that others other models inherit from, so that this doesn't have to be a thought that the developer has when creating a new model.

