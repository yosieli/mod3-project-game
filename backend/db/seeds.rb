# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

roysan = User.create(username: 'roysan', password: '123')
feven = User.create(username: 'feven', password: '123')
save_file = Savefile.create(user_id: 1, level: 1, time: 100, health: 3)
save_file = Savefile.create(user_id: 1, level: 2, time: 100, health: 3)
save_file = Savefile.create(user_id: 2, level: 1, time: 90, health: 2)