# Contributing to progressively
First off, thanks for taking the time to contribute!

Now, take a moment to be sure your contributions make sense to everyone else.
These are just guidelines, not rules.
Use your best judgment, and feel free to propose changes to this document in a pull request.

## Reporting Issues
Found a problem? Want a new feature? First of all see if your issue or idea has [already been reported](../../issues).
If don't, just open a [new clear and descriptive issue](../../issues/new).

## Submitting pull requests
Pull requests are the greatest contributions, so be sure they are focused in scope, and do avoid unrelated commits.
- Fork it!
- Clone your fork: `git clone https://github.com/<your-username>/progressively`
- Navigate to the newly cloned directory: `cd progressively`
- Create a new branch for the new feature: `git checkout -b my-new-feature`
- Install the tools necessary for development: `npm install`
- Make your changes.
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request with full remarks documenting your changes.

## Testing
Every time you write a test, remember to answer all the questions:

1. What are you testing?
2. What should it do?
3. What is the actual output?
4. What is the expected output?
5. How can the test be reproduced?

## Code Style
Follows the [JavaScript Standard Style](http://standardjs.com/).

## Scripts
- `npm run lint`: lint the files.
- `npm run build:css`: minify and add vendor prefixes (if needed) the css file.
- `npm run build:js`: uglify the js file.

