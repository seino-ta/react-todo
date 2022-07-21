# react-todo
## アプリケーションの目的
このアプリケーションは自己研鑽のために先輩と後輩で業務時間を使って定期的に勉強会を実施して作成しているものです。  
業務で触れにくい言語やツールなどを使うことを主目的としています。

## セットアップ手順

### PostgreSQLのインストール
[PostgreSQL を Windows にインストールするには](https://qiita.com/tom-sato/items/037b8f8cb4b326710f71)を参考にPostgreSQLをインストールしてください。
その際のユーザー名やパスワードなどは忘れないようにしてください。

### Gradleのインストール
[【Gradle】をWindows10にインストール](https://qiita.com/j-work/items/3fcf191cc8779c31ce35)を参考にGradleをインストールしてください。

### gitからソースのcloneを実施
任意のディレクトリで「`git clone git@github.com:seino-ta/react-todo.git`」を実行します。

### データベースの作成と初期データの投入
 - TODOアプリように任意のデータベースを作成します
 - 上記で作成したデータベースにテーブルを作成します  
   ```sql
   CREATE TABLE todo ( id SERIAL PRIMARY KEY , name VARCHAR(255) , overview VARCHAR(255) , content VARCHAR(10000) , status INT);
   ```
 - 上記で作成してテーブルに対してデータを投入します
   ```sql
   insert into todo (name, overview, content, status) values 
   ('DB Todo 1', 'OV 1', 'Content 1', 0),
   ('DB Todo 2', 'OV 2', 'Content 2', 1),
   ('DB Todo 3', 'OV 3', 'Content 3', 2);
   ```

### application.propertiesの変更
「`react-todo/src/main/resource`」以下の`application.properties`の以下の箇所を自分のデータベースの情報に照らし合わせて変更してください
 e.g.
 - `spring.datasource.url=jdbc:postgresql://localhost:5432/todoapp`
 - `spring.datasource.username=postgres`
 - `spring.datasource.password=nota`


### ビルド等の実行
cloneしてきたディレクトリ(`react-todo`)配下に「`frontend`」というフォルダが存在します。
「`forntend`」で以下のコマンドを実行します。
 - `npm install`
 - `yarn build`
 
 `react-todo`で`gradle build`を実行します
 
 ### 起動
  `react-todo`で`gradlew bootRun`を実行します
  http://localhost:8080/ にアクセスします
  
  
  
  
