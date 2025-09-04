
// BattleMap location constants
const BM_MAP_SIZE = 0x0202e4d4; // gBmMapSize, Vec2, {s16 x, s16 y}
const BM_MAP_UNIT = 0x0202e4d8; // gBmMapUnit, u8**
const BM_MAP_TERRAIN = 0x0202e4dc; // gBmMapTerrain, u8**
const BM_MAP_MOVEMENT = 0x0202e4e0; // gBmMapMovement, u8**
const BM_MAP_RANGE = 0x0202e4e4; // gBmMapRange, u8**
const BM_MAP_FOG = 0x0202e4e8; // gBmMapFog, u8**
const BM_MAP_HIDDEN = 0x0202e4ec; // gBmMapHidden, u8**
const BM_MAP_OTHER = 0x0202e4f0; // gBmMapOther, u8**

// Faction names / mask to get faction from unit ID
const FACTION_BLUE = 0x00; // Player faction
const FACTION_GREEN = 0x40; // Allied uncontrollable faction
const FACTION_RED = 0x80; // Enemy faction
const FACTION_PURPLE = 0xC0; // Other faction

// Unit array location constants
const UNIT_ARRAY_BLUE = 0x0202be4c; // gUnitArrayBlue, Unit**
const UNIT_ARRAY_GREEN = 0x0202cfbc; // gUnitArrayGreen, Unit**
const UNIT_ARRAY_RED = 0x0202ddcc; // gUnitArrayRed, Unit**
const UNIT_ARRAY_PURPLE = 0x0202e36c; // gUnitArrayPurple, Unit**
const ACTIVE_UNIT_ADDR = 0x03004e50; // Pointer to active unit, Unit*
const ACTIVE_UNIT_ID_ADDR = 0x0202be44; // ID of active unit, u8

// Unit struct constants
const UNIT_SIZE = 0x48; // Unit struct size w/ padding
const UNIT_POS_OFFSET = 0x10; // Offset to unit position {s8 x, s8 y}
const UNIT_MAX_HP_OFFSET = 0x12; // Offset to max HP, s8
const UNIT_HP_OFFSET = 0x13; // Offset to current HP, s8