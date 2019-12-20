import {Notification} from "element-ui";

export default {
	namespaced: true,

	actions: {
		send(ctx, {message, title, type}) {
			// make notification work on first load
			setTimeout(() => {
				Notification({message, title, type, offset: 40});
			}, 1);
		}
	}
};
