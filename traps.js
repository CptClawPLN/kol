placeTraps: function (unit, amount) {
        var i, j,
            spreadx = 0,
            traps = 0;

        this.lastTrapPos = {x: unit.x, y: unit.y};

        for (i = -1; i <= 1; i += 1) {
            for (j = -1; j <= 1; j += 1) {
                if (Math.abs(i) === Math.abs(j)) { // used for X formation
                    // unit can be an object with x, y props too, that's why having "mode" prop is checked
                    if (traps >= amount || (unit.hasOwnProperty("mode") && (unit.mode === 0 || unit.mode === 12))) {
                        return true;
                    }

                    if ((unit.hasOwnProperty("classid") && [211, 242, 243, 544].indexOf(unit.classid) > -1) || (unit.hasOwnProperty("type") && unit.type === 0)) { // Duriel, Mephisto, Diablo, Baal, other players
                        if (traps >= Config.BossTraps.length) {
                            return true;
                        }

                        Skill.cast(Config.BossTraps[traps], 0, unit.x + i, unit.y + j);
                    } else {
                        if (traps >= Config.Traps.length) {
                            return true;
                        }

                        Skill.cast(Config.Traps[traps], 0, unit.x + spreadx, unit.y + j);
                        spreadx = spreadx + 10
                    }

                    traps += 1;
                }
            }
        }

        return true;
    },
