/**
 * A map of terrain names to their corresponding terrain ID.
 * @type {Map<string, number>}
 */
export const TERRAIN_IDS = new Map([
    ['TILE_00', 0x00],
    ['PLAINS', 0x01],
    ['ROAD', 0x02],
    ['VILLAGE_03', 0x03],
    ['VILLAGE_04', 0x04],
    ['HOUSE', 0x05],
    ['ARMORY', 0x06],
    ['VENDOR', 0x07],
    ['ARENA_08', 0x08],
    ['C_ROOM_09', 0x09],
    ['FORT', 0x0A],
    ['GATE_0B', 0x0B],
    ['FOREST', 0x0C],
    ['THICKET', 0x0D],
    ['SAND', 0x0E],
    ['DESERT', 0x0F],
    ['RIVER', 0x10],
    ['MOUNTAIN', 0x11],
    ['PEAK', 0x12],
    ['BRIDGE_13', 0x13],
    ['BRIDGE_14', 0x14],
    ['SEA', 0x15],
    ['LAKE', 0x16],
    ['FLOOR_17', 0x17],
    ['FLOOR_18', 0x18],
    ['FENCE_19', 0x19],
    ['WALL_1A', 0x1A],
    ['WALL_1B', 0x1B],
    ['RUBBLE', 0x1C],
    ['PILLAR', 0x1D],
    ['DOOR', 0x1E],
    ['THRONE', 0x1F],
    ['CHEST_20', 0x20],
    ['CHEST_21', 0x21],
    ['ROOF', 0x22],
    ['GATE_23', 0x23],
    ['CHURCH', 0x24],
    ['RUINS_25', 0x25],
    ['CLIFF', 0x26],
    ['BALLISTA_REGULAR', 0x27],
    ['BALLISTA_LONG', 0x28],
    ['BALLISTA_KILLER', 0x29],
    ['SHIP_FLAT', 0x2A],
    ['SHIP_WRECK', 0x2B],
    ['TILE_2C', 0x2C],
    ['STAIRS', 0x2D],
    ['TILE_2E', 0x2E],
    ['GLACIER', 0x2F],
    ['ARENA_30', 0x30],
    ['VALLEY', 0x31],
    ['FENCE_32', 0x32],
    ['SNAG', 0x33],
    ['BRIDGE_34', 0x34],
    ['SKY', 0x35],
    ['DEEPS', 0x36],
    ['RUINS_37', 0x37],
    ['INN', 0x38],
    ['BARREL', 0x39],
    ['BONE', 0x3A],
    ['DARK', 0x3B],
    ['WATER', 0x3C],
    ['GUNNELS', 0x3D],
    ['DECK', 0x3E],
    ['BRACE', 0x3F],
    ['MAST', 0x40],
]);

/**
 * An inverted map to look up terrain names by their ID.
 * @type {Map<number, string>}
 */
export const TERRAIN_NAMES = new Map(
    Array.from(TERRAIN_IDS, ([name, id]) => [id, name])
);

/**
 * Gets the terrain name from its ID.
 * @param {number} id The terrain ID (e.g., 0x01).
 * @returns {string} The name of the terrain (e.g., 'TERRAIN_PLAINS') or 'UNKNOWN'.
 */
export function getTerrainNameById(id) {
    return TERRAIN_NAMES.get(id) || 'UNKNOWN';
}