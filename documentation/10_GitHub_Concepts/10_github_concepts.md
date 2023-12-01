# Github concepts

## Branches
A fundamental concept in Git and GitHub is that of **branches**. You can think of a GitHub repository as a tree where the main development branch is the trunk, with other branches sprouting from that trunk (or from smaller branches along the way). Where the metaphor starts to fall apart is when, further down the development cycle, the branches merge once again with the main development trunk. Here's a simple diagram to illustrate this principle:

![Github flow diagram](./img/01_github-flow.png)

In the diagram, 'Master', 'Bugfix', and 'Feature' are three separate branches of the same repository. Each of the nodes represents a [commit](./10_github_concepts.md#commit), and each point where the branches reunite represent a [pull request](./10_github_concepts.md#pull-request). This is the standard GitHub workflow.

Generally speaking, changes should be grouped thematically and made in branches. In regular software development this would be the development of a new feature, or the fixing of a particular bug. Creating a new branch to do this allows the developer to test out the fix or the new feature *without danger to the rest of the project*. Once that feature or bugfix is complete, you can create a [pull request](./10_github_concepts.md#pull-request) which will merge the new changes with the existing project.

In our case, branches should represent groups of related changes to content of the _Bee Book_: adding new sections or buzzwords, or editing existing content. Isolating that task means that any errors introduced during this process should be isolated from the main development branch (and therefore should not pass the [pull request](./10_github_concepts.md#pull-request) review).

## Commit
Committing changes basically creates a new recovery point for the history of the repository. You can think of committing as basically doing a 'double-save': you are not only saving the document, but you are also saving it as a recoverable point. Having a rich and fine-grained commit history allows us to easily go back in time if any changes introduce unwanted mistakes. There's an oft quoted saying in software development: commit little, commit often. Keep that in mind.

## Issues
Issues are a very useful feature in Github: they allow you to flag things that need to be fixed, suggest new features, create a list of tasks, etc, while, at the same time, keeping track of any changes, discussions or problems around that issue. They can be referenced in other issues, [pull requests](#pull-request), etc. You should try to use issues wherever possible.

## Pull changes
Pulling changes simply means ensuring your local copy of the repository and the branch are up to date with the truth of the remote repository. This means that whenever more than one people are working on the same branch (or when you work from more than one computer), you can still be sure that you are working from the latest possible version of the file if you remember to pull any new changes before starting your work.

## Pull request
Pull request is the process by which we merge one branch into another. The request includes a brief description of any changes made, a list of all the [commits](#commit) that are part of it, as well as much more data. The pull request always goes through a process of automatic verification which ensures the various versions of the various files can safely be merged without losing anything; if that verification fails, you will not be able to merge until you fix the problems. A pull request may also go through a process of manual review which tests for anything that cannot be tested automatically, ensures the problem is adequately solved or the feature has adequately been developed. **Please note that a pull request is not the same as [pulling changes](#pull-changes).** Some people prefer to call it a *merge* request which makes its function clearer, but GitHub uses the term pull request, so that's what we'll use.

## Push
Pushing your changes means the opposite of pulling your changes: you are updating the remote repository with the changes you've made and committed to your local copy. You can push after each commit, or group commits and push them at the end of the day. Generally, you should push as soon as you commit, and making sure all changes have been saved, committed and pushed to the remote repository should be the last thing you do every day before closing Oxygen.

## Stage
Staging changes is an intermediary step between saving and committing them to the repository. You are simply saying that the changes to the document are ready to be committed. There's more to it than that (and staging allows you to do all sorts of cool stuff to your changes), but for our purposes staging always immediately precedes comitting.