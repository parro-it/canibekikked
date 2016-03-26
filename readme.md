# canibekikked

Tool to check if any of your NPM repository name is trademarked.

> 

> This tool was originally named "canibekiked".
> I'm not a native speaker, I had no idea what "kike" means in english before reading [this issue](https://github.com/parro-it/canibekikked/issues/2).
> I intended the word only in the sense "to suffer the same fate as the azer/kik project".
> I renamed the project, my apologies to anyone who could be offended by this.
>

![image](https://cloud.githubusercontent.com/assets/11197111/14053193/e3fc4148-f2cf-11e5-982c-52bbe49f86fd.png)


[![Travis Build Status](https://img.shields.io/travis/parro-it/canibekiked.svg)](http://travis-ci.org/parro-it/canibekiked)
[![NPM module](https://img.shields.io/npm/v/canibekiked.svg)](https://npmjs.org/package/canibekiked)
[![NPM downloads](https://img.shields.io/npm/dt/canibekiked.svg)](https://npmjs.org/package/canibekiked)

# Installation

```bash
npm install -g canibekiked
```

# Usage

Check all repositories of user you are currently logged in on NPM:

```bash
$ canibekiked
```

Check all repositories of a particulr user:

```bash
$ canibekiked parroit
```

# Related projects

* [is-trademarked](https://github.com/egoist/is-trademarked) - Check if a word is trademarked.
This project is inspired by this [issue on is-trademarked repo](https://github.com/egoist/is-trademarked/issues/3).

Canibekiked API module depends on this project.

* [canibekiked-api](https://github.com/parro-it/canibekiked-api) - API used by this cli module.


# License

The MIT License (MIT)

Copyright (c) 2016 parro-it
