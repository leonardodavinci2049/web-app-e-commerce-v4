# FLUXO GIT FLOW


## GIT FLOW DEV1

### Task 1 - Antes de comerçar uma nova feature

```shell
git checkout main
git pull origin main
pnpm install 

git checkout develop
git pull origin develop
pnpm install 

git branch

```


### Task 2 - Iniciar nova feaure

```shell

git branch
git flow feature start featr-38

```

### Task 3 - Finalizar Feaure

só use se estiver tudo ok, ou apena der commit - cuidado não execute 
sempre execute o lint e o build 

```shell

git add .
git commit -m " task final adjustments and completion"

git flow feature finish featr-38
git branch
git push origin develop

```


### Task 7 - Iniciar uma nova feature

```shell
# crie uma nova 
git branch
git flow feature start featr-33

```
### Task 8 - excluir branchs

```shell

git checkout develop
git checkout feature/featr-18
git branch -D feature/featr-27
git branch

```