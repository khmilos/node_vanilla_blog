export default class Modal {
  constructor (container) {
    this.container = container
    this.isOpen = false
  }

  open () {
    if (this.isOpen) return
    this.container.classList.add('modal_active')
    this.isOpen = true
  }

  close () {
    if (!this.isOpen) return
    this.container.classList.remove('modal_active')
    this.isOpen = false
  }

  toggle () {
    if (!this.isOpen) this.close()
    else this.open()
  }
}
