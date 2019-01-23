jonmann20.github.io
===================

My personal website.

Setup
-----
* `npm i`
* `git checkout dev`
* `git add worktree dist master`
	* Now when you are in the `dist` folder, you'll be on the `master` branch.  Go back to root and you are on `dev`.  See http://pressedpixels.com/articles/deploying-to-github-pages-with-git-worktree/ for more info.

Develop
-------
* Develop in `./`
* `gulp`
    * compiles to `dist`
* `cd ./ && git add -A && git commit -m "" && git push origin dev`

Test
----
* `gulp prd`
* `gulp srv`

Deploy
------
* `gulp prd`
* `cd dist && git add . && git commit -m "" && git push origin master`