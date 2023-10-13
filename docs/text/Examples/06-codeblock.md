# コードブロックの使い方

## 挿入の手順
コードブロックの入れ方は二つあります。
### 直接MDファイルに書き込む方法
````
```python
print("Hello, World!")
```
````
のように書くと、
```python
print("Hello, World!")
```
のように表示されます。

### 外部ファイルを読み込む方法
もっと長いコードを書きたいときは、外部ファイルを読み込む方法があります。
`public/assets/other/sample.py`というファイルがあることを確認してください。
そして、以下のように書くと、コードブロックが挿入されます。
````
<<< @/public/assets/other/sample.py
````
<<< @/public/assets/other/sample.py

部分的に外部ファイルを読み込みたい場合は
````
```python
<!--@include: @/public/assets/other/sample.py{3,}-->
```
````
のように書くと、
```js=3
<!--@include: @/public/assets/other/sample.py{3,4}-->
```

## 具体例
いくつか機能があるので、それを紹介します。
### 行番号
この環境では最初から、行番号が表示されるようになっています。
もし、一時的に行番号を消したいときは、
````
```python:no-line-numbers
print("Hello, World!")
```
````
のように書くと、
```python:no-line-numbers
print("Hello, World!")
```
非表示になります

### ハイライト
ハイライトをしたいときは、
````
<<< @/public/assets/other/sample.py{1,3-4}
````
のように書くと、

<<< @/public/assets/other/sample.py{1,3-4}



のようになります。

### その他
その他の機能については、
[こちら](https://vitepress.dev/guide/markdown#syntax-highlighting-in-code-blocks)を参照してください。
以下のような機能があります。
- フォーカス
- 差分表示
- 途中から行数表示
- CodeGroup(複数のコードをラベルで表示)
