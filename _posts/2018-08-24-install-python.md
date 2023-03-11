---
layout: post
title: "安装 Python 环境"
categories: python
bgcolor: "#98bec8"
---

[Installing Python 3 on Linux](https://docs.python-guide.org/starting/install3/linux/)

    $ python3 --version

    $ sudo apt-get update
    $ sudo apt-get install python3.6

[Install pip](https://pip.pypa.io/en/stable/installing/)

    $ curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
    $ python get-pip.py

Prerequisites, [Install python3.x-dev](https://stackoverflow.com/a/33874511/2862195).

    $ sudo apt-get install python-dev
    $ sudo apt-get install python3.6-dev

I would just avoid the use of virtualenv after Python3.3+ and instead [use the standard shipped library venv](https://stackoverflow.com/a/47559925/2862195). To create a new virtual environment you would type:

    $ sudo apt-get install python3-venv
    $ python3 -m venv ~/.myvenv
    $ source ~/.myvenv/bin/activate
    $ deactivate

Install pip

    $ pip install --upgrade pip

---

Install packages using pip

    $ pip install Scrapy --user
    $ scrapy startproject mybot

    # cd mybot
    $ scrapy genspider example example.com  # website to crawl
