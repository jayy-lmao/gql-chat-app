{
   "type": "postgresql",
   "host": "db",
   "port": 6379,
   "username": "jayylmao",
   "password": "yeetus",
   "database": "chatapp",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ]
}
