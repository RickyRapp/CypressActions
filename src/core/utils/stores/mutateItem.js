export function mutateItem(refresh, mutateAction) {
    return async item => {
        const mutationResponse = await mutateAction(item);
        refresh();
        return mutationResponse;
    }
}
