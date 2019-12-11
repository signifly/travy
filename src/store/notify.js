import {Notification} from "element-ui";

export default {
	namespaced: true,

	actions: {
		send(ctx, {message, title, type}) {
			Notification({message, title, type, offset: 40});
		}
	}
};
