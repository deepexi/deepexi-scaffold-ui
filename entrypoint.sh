#!/bin/bash

scaffold-ui start -p 7001 -s
tail -F /root/logs/deepexi-scaffold-ui/*.log
