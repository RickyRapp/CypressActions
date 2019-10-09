export default function unionArray(x, y) {
	return [...new Set([...x, ...y])];
}
