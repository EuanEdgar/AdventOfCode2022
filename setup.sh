#!/usr/bin/env bash

cp -r template $1

sed -i '' "s/#n/${1}/" ./$1/part1.html
sed -i '' "s/#n/${1}/" ./$1/part2.html
