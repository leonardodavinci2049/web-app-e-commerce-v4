```shell
#  Para executar o arquivo schema-better-auth-update-db.js, você pode usar um dos seguintes comandos:
node prisma/operation/schema-better-auth-update-db.js

```

#  atualizar o shema prisma e o Cliente prisma
#  User	tbl_user
#  Session	tbl_session
#  Account	tbl_account
#  Verification	tbl_verification	  @@map("tbl_verification")

#  Member		tbl_member
#  Organization	tbl_organization
#  Invitation	tbl_invitation

```shell
npx prisma db pull
npx prisma generate

```
