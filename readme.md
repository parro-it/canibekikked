# canibekikked

Tool to check if any of your NPM repository name is trademarked.


> This tool was originally named "canibekiked".

> I'm not a native speaker, I had no idea what "kike" means in english before reading [this issue](https://github.com/parro-it/canibekikked/issues/2).

> I intended the word only in the sense "to suffer the same fate as the azer/kik project".

> I renamed the project, my apologies to anyone who could be offended by this.


![image](https://cloud.githubusercontent.com/assets/11197111/14062535/d72486c8-f3a2-11e5-84d7-9c590cfacfeb.png)


[![Travis Build Status](https://img.shields.io/travis/parro-it/canibekikked.svg)](http://travis-ci.org/parro-it/canibekikked)
[![NPM module](https://img.shields.io/npm/v/canibekikked.svg)](https://npmjs.org/package/canibekikked)
[![NPM downloads](https://img.shields.io/npm/dt/canibekikked.svg)](https://npmjs.org/package/canibekikked)

# Installation

You need Node 4.0.0 or greater in order to use `canibekikked`.

```bash
npm install -g canibekikked
```

# Usage

Check all repositories of logged user on NPM:

```bash
$ canibekikked
```

Check all repositories of a particulr user:

```bash
$ canibekikked parroit
```

# Your own API token

Since the API has rate-limit, you can supply your own API token. Sign up to [markerapi](http://www.markerapi.com/) to get one for free.

```bash
# replace with your token
$ canibekikked -t yZ32rW4Pq6
```

# Related projects

* [is-trademarked](https://github.com/egoist/is-trademarked) - Check if a word is trademarked.

This project is inspired by this [issue on is-trademarked repo](https://github.com/egoist/is-trademarked/issues/3).

canibekikked API module depends on this project.

* [canibekikked-api](https://github.com/parro-it/canibekikked-api) - API used by this cli module.


# License

The MIT License (MIT)

Copyright (c) 2016 parro-it
