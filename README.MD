# nodejs+express+mongoose+restful 项目
    作为学习使用,该项目包含 日志,jwt校验,mongodb,配置等部分.
    本项目采用idea开发
    本项目包含打docker镜像, 并且镜像在swarm集群中启动.

## 1. 项目目录
    - bin
       | -  www.js    启动目录
    - common          工具目录
       | -  config.js     配置信息
       | -  db.js         mongdb链接
       | -  jwt.js        jwt校验中间件
       | -  log.js        日志配置
    - controller        dao层
       | -  user.js
    - models             模型层
       | - user.js     
    - node_modules      nodejs依赖包
    - public         
    - routes            路由层
       | - auth.js      校验路由
       | - index.js     根路由
       | - user.js      用户相关路由
    - views
    - .gitignore      git忽略
    - app.js          应用入口js
    - build.sh        docker 打包命令
    - Dockerfile      Docker编排文件
    - dev.yml         swarm启动配置文件
    - package.json    
    - package-lock.json   
    - README.MD      项目说明文档  
    
## 2. 如何打项目镜像 
    在项目根目录下,执行:
    ./build.sh -v  $tag      tag-->是镜像的版本号
    
## 3. docker启动镜像命令:
    
    docker run -p 3000:3000 --name node_demo harbornode.mydadao.com/test/node_demo:2.0
    
## 4. 访问服务url
    
    授权服务: post 访问  ,传入 username,password参数. 获取jwt token .
    http://localhost:3000/auth/signin
    
    访问用户服务,需传入授权服务获得的token,放入 x-access-token  头参数.
    http://localhost:3000/get/:user_id
    
## 5. swarm 集群启动
    
    执行启动命令:
    docker stack up -c dev.yml node_demo
    
    删除服务命令:
    docker stack rm node_demo
    
    查看服务
    docker service ls

## 6. FAQ
### 6.1 程序链接本地mongo,在ide启动连接没问题,但是docker启动链接会出现链接不上mongodb.
    通常出现这个情况,是由于本地采用127.0.0.1的IP链接mongodb,这需要查看下当前局域网IP,比如我的局域网IP:192.168.0.140.
    配置成此IP ,替代 127.0.0.1 ,则问题解决.
    
### 6.2  swarm启动方式,如果想要启动swarm里的mongodb,那么mongodb的启动方式,也需采用swarm方式.
        这样服务与mongo在同一网下.
    



    
    

  
