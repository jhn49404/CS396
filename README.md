CS396
=====

A project for a class.

How to Checkout with Git
===

(because we're noobs at this)

Have Joe add you as a contributor.

$ git init

$ git remote add github https://github.com/jhn49404/CS396.git

$ git pull github master

How to Edit with Git
===

After you make some significant progress, do:

$ git commit -a -m "MESSAGE"

When it's time to sync with the repo, do:

$ git pull --rebase github master

$ git push github master

Notes
===

Commit updates only your local repository. Push updates the repo.

Sublime text has a nifty shortcut (with the Git plugin installed) to commit: Ctrl+shift+p, "quick commit" => message.