import {useMount} from "~/index"
import Modal from "play/components/Modal.vue"

export function useModal() {
    const mount = useMount()

    return function mountModal() {
        mount(
            () => (
                <Modal onConfirm={mountModal}>{{
                    header: () => "Custom heading using composed jsx slot",
                    content: ()=> "This is custom content text using the magic of slots."
                }}</Modal>
            ),
            "modal"
        )
    }
}
