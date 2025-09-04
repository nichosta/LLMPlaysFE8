  Main Battle Map Global Variables

  Core Battle Map State:
  - gBmSt - Main battle map state (struct BmSt, 64 bytes)
    - Camera position: gBmSt.camera (Vec2 at offset 0x0C)
    - Player cursor: gBmSt.playerCursor (Vec2 at offset 0x14)
    - Map rendering origin: gBmSt.mapRenderOrigin (Vec2u at offset 0x24)

  Game Progress State:
  - gPlaySt - Chapter/game progress state (struct PlaySt)
    - Current chapter: gPlaySt.chapterIndex (s8 at offset 0x0E)
    - Turn number: gPlaySt.chapterTurnNumber (u16 at offset 0x10)
    - Current faction/phase: gPlaySt.faction (u8 at offset 0x0F)
    - Cursor position: gPlaySt.xCursor, gPlaySt.yCursor (u8 at offset 0x12-0x13)

  Map Data Arrays:
  - gBmMapSize - Map dimensions (struct Vec2)
  - gBmMapUnit - Unit positions on map (u8**)
  - gBmMapTerrain - Terrain type data (u8**)
  - gBmMapMovement - Movement range data (u8**)
  - gBmMapRange - Attack range data (u8**)
  - gBmMapFog - Fog of war data (u8**)

  Unit Arrays:
  - gUnitArrayBlue[62] - Player units (struct Unit array)
  - gUnitArrayRed[50] - Enemy units (struct Unit array)
  - gUnitArrayGreen[20] - Allied NPC units (struct Unit array)
  - gActiveUnit - Pointer to currently selected unit (struct Unit*)
  - gActiveUnitId - ID of active unit (u8)

  Key Structure Definitions

  struct BmSt (64 bytes):
  - 0x0C: camera (Vec2) - Current camera position
  - 0x14: playerCursor (Vec2) - Player cursor position
  - 0x24: mapRenderOrigin (Vec2u) - Map rendering origin

  struct Unit (72 bytes):
  - 0x10: xPos, yPos (s8) - Unit position on map
  - 0x12: maxHP, curHP (s8) - Health stats
  - 0x0C: state (u32) - Unit state flags
  - 0x08: level (s8), exp (u8) - Level and experience

  struct Trap (8 bytes):
  - 0x00: xPos, yPos (u8) - Trap position
  - 0x02: type (u8) - Trap type
  - 0x03: extra (u8) - Extra data
  - 0x04: data[4] (s8) - Additional trap data

  These symbol names can be used with your symbol map to get the actual memory addresses for direct memory reading
  to track battle map state, unit positions, cursor location, and other game data.

  
  How to Use gBmMapUnit

  The gBmMapUnit is a 2D array that tracks which unit is positioned at each map coordinate. Here's how it works:

  Structure:
  - gBmMapUnit is a u8** (pointer to array of u8*)
  - Access: gBmMapUnit[y][x] where y=row, x=column
  - Map dimensions are stored in gBmMapSize.x and gBmMapSize.y

  Unit ID Values:
  - 0 = No unit at this position
  - 1-255 = Unit ID that can be passed to GetUnit(id) to get the unit struct
  - The unit ID encodes faction information in the upper bits:
    - id & 0x80 = Enemy units (red)
    - id & 0x40 = Allied NPCs (green)
    - id & 0x00 = Player units (blue)

  Usage Examples:
  // Check if there's a unit at cursor position
  u8 unitId = gBmMapUnit[gBmSt.playerCursor.y][gBmSt.playerCursor.x];
  if (unitId != 0) {
      struct Unit* unit = GetUnit(unitId);
      // Now you have the unit struct
  }

  // Check for enemy units
  if (gBmMapUnit[y][x] & 0x80) {
      // Enemy unit present
  }

  // Scan entire map for units
  for (int y = 0; y < gBmMapSize.y; y++) {
      for (int x = 0; x < gBmMapSize.x; x++) {
          u8 unitId = gBmMapUnit[y][x];
          if (unitId != 0) {
              struct Unit* unit = GetUnit(unitId);
              // Process unit
          }
      }
  }

  How to Decode Terrain Data

  The terrain system has two levels:

  1. Base Terrain Data (gBmMapTerrain):
  - gBmMapTerrain[y][x] gives you the processed terrain ID
  - These IDs correspond to the enums in constants/terrains.h
  - Values like:
    - 0x01 = TERRAIN_PLAINS
    - 0x0C = TERRAIN_FOREST
    - 0x11 = TERRAIN_MOUNTAIN
    - 0x15 = TERRAIN_SEA
    - etc.

  2. Raw Tile Data (for advanced usage):
  // Get the "true" terrain (bypassing light rune modifications, etc.)
  int GetTrueTerrainAt(int x, int y) {
      return gTilesetTerrainLookup[gBmMapBaseTiles[y][x] >> 2];
  }

  Terrain Decoding Process:
  1. Raw map tiles are stored in gBmMapBaseTiles[y][x] (16-bit values)
  2. The upper 14 bits (>> 2) index into gTilesetTerrainLookup
  3. This lookup table converts tile IDs to terrain type IDs
  4. The processed terrain is stored in gBmMapTerrain[y][x]

  Usage Examples:
  // Get terrain at specific position
  u8 terrain = gBmMapTerrain[y][x];

  // Check terrain types
  if (terrain == TERRAIN_FOREST) {
      // Forest tile
  } else if (terrain == TERRAIN_MOUNTAIN) {
      // Mountain tile
  }

  // Get movement cost (requires unit's movement cost table)
  const s8* moveCostTable = GetUnitMovementCost(unit);
  int moveCost = moveCostTable[terrain];

  Key Memory Locations for Direct Reading:
  - Map dimensions: gBmMapSize (struct Vec2)
  - Unit positions: gBmMapUnit (u8** - 2D array)
  - Terrain types: gBmMapTerrain (u8** - 2D array)
  - Movement costs: gBmMapMovement (u8** - 2D array)
  - Attack ranges: gBmMapRange (u8** - 2D array)
  - Fog of war: gBmMapFog (u8** - 2D array)

  The unit arrays (gUnitArrayBlue, gUnitArrayRed, gUnitArrayGreen) contain the actual unit data structures, while
  gBmMapUnit just maps positions to unit IDs that index into those arrays via the gUnitLookup table.

