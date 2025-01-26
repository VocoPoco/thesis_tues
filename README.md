# thesis_tues

A SAPUI5 library for generating user-end documentation from a md file

Markdown file >> AST file >>

use babel, webpack or

Benefits of Using Webpack
Customizable Module Resolution:

Webpack's resolve configuration allows you to define how modules are found and resolved.
You can specify directories to search for modules, file extensions to resolve, and aliases for path simplification.
Transpilation Support:

With ts-loader, Webpack can transpile your TypeScript code into JavaScript, handling any necessary transformations.
Bundling and Optimization:

Webpack can bundle your application into a single file or split it into chunks, optimizing for performance.
Compatibility with Modern Dependencies:

Webpack handles both ES Modules and CommonJS modules, allowing you to use the latest versions of dependencies like unified and remark-parse.
Avoiding File Extensions in Imports:

By configuring the extensions option, you can import modules without specifying file extensions.

[arbitrary case-insensitive reference text]: https://www.mozilla.org

[I'm a reference-style link][Arbitrary case-insensitive reference text]

TABLES NEED TO HANDLE DIFFERENT TYPES AFTER THE LINE MMODIFICATION BECAUSE IT BREAKS.

- if there is a type that i do not support (linkReferece, footnote, imageReference) in the tables, the whole conversion breaks - NEEDS FIXING

WORK LEFT TO DO:

- fix languages in codeEditor because some are configured different between markdown and sapui5 for instance (c# (.md) == csharp)
- tests
- navigation menu (optional)

run tests with:
jest --selectProjects unit
jest --selectProjects integration
jest --selectProjects e2e

or all tests with:
jest
