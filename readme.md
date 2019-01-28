jonmann20.github.io
===================

My personal website.

Setup
-----
* `npm i`
* `git checkout dev`
* `git worktree add dist master`
	* When you are in the `dist` folder, you'll be on the `master` branch.  Go back to root and you are on `dev`.  See http://pressedpixels.com/articles/deploying-to-github-pages-with-git-worktree/ for more info.
* If the dist folder is removed you will need to run `git worktree prune` and then re-add to get things working again.

Develop
-------
* Develop in `./`
* `gulp`
	* mostly serves from root, compiles a few things
* `cd ./ && git add -A && git commit -m "" && git push origin dev`

Test
----
* `gulp prd`
	* compiles to `dist`
* `gulp srv`

Deploy
------
* `gulp prd`
* `cd dist && git add . && git commit -m "" && git push origin master`