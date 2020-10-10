import Modal from './modal'

export default function modalFactory (
  container,
  { toOpen, toClose, toToggle }
) {
  if (!container) return null

  const modal = new Modal(container)
  const groups = [toOpen, toClose, toToggle]
  const actions = [modal.open, modal.close, modal.toggle]

  groups.forEach((group, index) => {
    if (!Array.isArray(group)) return
    group.forEach((element) => {
      element.addEventListener('click', (event) => {
        event.preventDefault()
        actions[index].call(modal)
      })
    })
  })

  window.addEventListener('click', (event) => {
    if (event.target === modal.container) modal.close()
  })

  return modal
}
