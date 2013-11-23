#!/bin/bash
if [ "$1" == ci ]; then
  testem ci --file "tests/testem.json"
else
  testem --file "tests/testem.json"
fi