import { system, PlayerInventoryComponentContainer, Items, ItemStack, world, ItemEnchantsComponent } from "@minecraft/server";


const air = new ItemStack(Items.get("minecraft:stick"), 0)

system.runSchedule(() => {
    for (const player of world.getPlayers()) {
        /**
         * @type {PlayerInventoryComponentContainer}
         */
        const container = player.getComponent("inventory").container;

        for (let i = 0; i < container.size; i++) {
            const item = container.getItem(i);
            if (!item) continue;
            /**
             * @type {ItemEnchantsComponent}
             */
            const enchantComponent = item.getComponent("enchantments")

            for (const enchant of enchantComponent.enchantments) {
                if (enchant.type.maxLevel >= enchant.level) continue
                container.setItem(i, air);
                world.say("Illegal Item Enchant");
                break;
            }
        }
    }
})