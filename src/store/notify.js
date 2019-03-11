import {Notification} from "element-ui";
import {throttle} from "lodash";

// fix overlapping notifications when multiple are sent within the same tick. throttle.
const notify = throttle((obj) => Notification(obj), 50);

export default {
	namespaced: true,

	actions: {
		send(ctx, {message, title, type}) {
			(async () => {
				// make notification work on first load
				await new Promise(resolve => setTimeout(resolve, 1));
				notify({message, title, type, offset: 40});
			})();
		}
	}
};
