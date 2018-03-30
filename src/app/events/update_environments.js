import * as mqtt from "mqtt";
import { EnvironmentScheduleSchema } from "../models/Environment";
import { MongoDB } from "../configs/database";

let updateStatus = (connection, updates) => {
    var client  = mqtt.connect(connection);

    client.on('connect', () => {
        updates.forEach(e => {
            client.publish('steaph/environments/' + e.environment + "/status",
            e.status ? "true" : "false", {qos: 1, retain: false});

            console.log("> Set status " + e.environment + " = " + e.status);
        });

        client.end();
    });
}

exports.UpdateEnvironmentsCron = (connection, delay) => {
    if(MongoDB) {
        EnvironmentScheduleSchema.find({}, (err, schedules) => {
            if(err || schedules.length == 0)
                return;

            var on = [];
            var off = [];
            var now = new Date();
            let d = new Date(now);
            d.setHours(now.getHours());

            schedules.forEach((s) => {
                if(d > _baseDate(new Date(s.start))
                && now <= _baseDate(new Date(s.end))) {
                    if(on.indexOf(String(s.environment)) == -1)
                        on.push(String(s.environment));
                }
                else {
                    if(off.indexOf(String(s.environment)) == -1)
                            off.push(String(s.environment));
                }
            });

            off.forEach((i) => {
                if(on.indexOf(i) > -1)
                    off.splice(off.indexOf(i), 1);
            });
            for(var i = 0; i < on.length; i++) on[i] = { environment: on[i], status: true };
            for(var i = 0; i < off.length; i++) off[i] = { environment: off[i], status: false };

            var buffer = on.concat(off);
            updateStatus(connection, buffer);
        });
    }

    setTimeout(() => {UpdateEnvironmentsCron(delay);}, delay);
}

let _baseDate = function(date) {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(),date.getMilliseconds());
};