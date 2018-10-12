lockpicking minigame for opening treasure boxes
potions
enchanting
socketing
smeltery
coloring
texturing

pistons and redstone to automate crafting

Tool crafting
- Handle
- Blade/Head

Furnace to heat connected appliances.



Iron Sword
Masterwork Iron Sword
Legendary Iron Sword with Unique Pattern and Leather handle
Rope
Boots made of Cloth / Leather
Boots with different colors
Fresh/Rotten Food
Water Bucket
Coal Bucket
Treasure Box (that is locked)
Clothes with Unique Pattern
Leather Armor with different colors
Ripped Clothes that can be repaired
Potions with different effects
Health Potions with varying effects





ItemStack
- ItemElement

Crafting relationship is based on instanceOf

Item
- Width / Height
- Name
- Texture
- Base Value
- Max Durability
- Max Stack Size
- Material Type
  - Sound Type
  - Burn Factor
- Max Socket Count (dependent on item size)
- Decay Factor
  - CanDecayTime
  - CanDecayUse
  - CanDecayCraft
  - CanDecaySpecial???
- Enchantment Type
- Any Use Logic



Things that are stackable:
Components
- Iron Ore
- Arrows
  - Quality varies
- Throwing Stars
  - Even though durability varies
  - Quality varies
- Health Potions?
  - Amount varies
  - Quality varies
  - Some enchantment varies
- Torches
- General Clothes

- Iron Swords
- Unsocketed Items
- Dyed Items (of the same type)
- Container Items (of the same type of content)
- Perishable Items (of teh same type)

Things that are NOT stackable:
- Container Items (with different content)
- Different Potion Base Types
- Unique Swords
- Socketed Items
- Enchanted Items
- Patterned Items


Item
- Size (Width / Height)
- Base Value
- Quality
- Durability
- Whether it is stackable
  - Max Stack Size
  - Current Stack Size
- Material Type
  - Sound Type
  - Is Burnable?
- Socket count
- Enchantable
- Enchantments
- Perishable



Container Item
- Can be filled with a particular item type
- And removed upon crafting/use

Equipment Item
- Equippable to equipment slot

Dyeable Item
- Can be colored / remove color

Repairable Item
- Can be repaired

Playable Item
- Has a particular sound palette
