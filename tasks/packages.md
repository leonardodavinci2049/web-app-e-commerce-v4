

```shell
#  high severity vulnerabilityhigh severity vulnerability
#  Este comando mostrará um relatório detalhado das vulnerabilidades, incluindo:
#  Qual package específico tem o problema
#  Qual versão está vulnerável
#  Descrição da vulnerabilidade
#  Severidade (low, moderate, high, critical)
pnpm audit

#  Gerar relatório em formato JSON (mais detalhado)
pnpm audit --json

#  Tentar corrigir automaticamente
pnpm audit fix

#  Corrigir forçadamente (cuidado!)
#  Atenção: O --force pode fazer breaking changes, use com cuidado.
#  Execute primeiro o npm audit para ver exatamente qual package e vulnerabilidade você tem, depois você pode decidir a melhor forma de corrigi-la.
pnpm audit fix --force


# Verificar quais packages estão desatualizados
pnpm outdated

# Atualizar packages
pnpm update
pnpm update --latest 
# Atualizar para as versões mais recentes (ignorando as restrições de versão)

# Atualizar um package específico
npm install package-name@latest

# Ver a versão atual do npm
npm --version

# Atualizar o próprio npm
npm install -g npm@latest

# Limpar cache do npm (se houver problemas)
npm cache clean --force


```