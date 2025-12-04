# FLUXO GIT FLOW


## GIT FLOW DEV1

### Task 1 -  DEV 1 Antes de comerçar uma nova feature

```shell
git checkout develop
git pull origin develop


git branch

```

### Task 2 - Iniciar feaure

```shell

git branch
git flow feature start featr-37

```

### Task 3 - Finalizar Feaure

só use se estiver tudo ok, ou apena der commit - cuidado não execute 
sempre execute o lint e o build 

```shell

git add .
git commit -m " task final adjustments and completion"

git flow feature finish featr-37
git branch
git push origin develop

```
### Task 4 - xxxx

### Task 5 - Criar a release (Somente DEV1 )

- Certifique que está na branch developerQ

```shell

git flow release start rls-37
# atualize os pacotes e faça o build novamente
git flow release finish rls-37
finish release rls-37

git branch

```
### Task 6 - Enviar para o Main remoto

```shell
clear
git push origin main develop --follow-tags

```


```shell
# crie uma nova 
git branch
git flow feature start featr-36

```
### Task 8 - excluir branchs

```shell

git checkout develop
git checkout release/rls-36

git branch -D feature/featr-38
git branch

```