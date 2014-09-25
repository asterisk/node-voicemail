# Asterisk Voicemail Application

Asterisk voicemail application that allows users to leave messages for a mailbox.

# Installation

```bash
$ git clone https://github.com/asterisk/node-voicemail.git
$ cd node-voicemail
$ npm install -g .
```

or add the following the your package.json file

```JavaScript
"dependencies": {
  "voicemail": "asterisk/node-voicemail"
}
```

# Usage

# Development

After cloning the git repository, run the following to install the module and all dev dependencies:

```bash
$ npm install
$ npm link
```

Then run the following to run jshint and mocha tests:

```bash
$ grunt
```

jshint will enforce a minimal style guide. It is also a good idea to create unit tests when adding new features.

# License

Apache, Version 2.0. Copyright (c) 2014, Digium, Inc. All rights reserved.

