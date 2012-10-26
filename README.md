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

Or just use "quick commit" in Sublime Text.

---

When it's time to sync with the repo, do:

$ git pull --rebase github master

$ git push github master