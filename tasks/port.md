lsof -i :5555
kill -9 26405


# Opção 1: Matar por nome do processo
pkill -f "next dev"

# Opção 2: Matar por porta (se souber o PID)
lsof -ti:5555 | xargs kill

# Opção 3: Matar processos npm
pkill -f "npm run dev"


npm run dev

# NEST

lsof -i :3333
kill -9 26405
lsof -i :3333
npm run start:dev