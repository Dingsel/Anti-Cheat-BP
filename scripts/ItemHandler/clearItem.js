import { system, PlayerInventoryComponentContainer, Items, ItemStack, world } from "@minecraft/server";

const bannedItems = [
    "minecraft:apple",
    "minecraft:shulker"
]

const air = new ItemStack(Items.get("minecraft:stick"), 0)

system.runSchedule(() => {
    for (const player of world.getPlayers()) {
        /**
         * @type {PlayerInventoryComponentContainer}
         */
        const container = player.getComponent("inventory").container;

        for (let i = 0; i < container.size; i++) {
            const item = container.getItem(i);
            if (!item || !bannedItems.includes(item.typeId)) continue;
            container.setItem(i, air);
            world.say(`${player.name} was found having an illegal item. ${item.typeId} was cleared from their inventory.`);
        }
    }
})