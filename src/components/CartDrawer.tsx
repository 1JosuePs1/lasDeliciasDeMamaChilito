import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { formatPrice, imagePath, whatsapp } from '../data/catalog'
import type { Product } from '../data/catalog'
import styles from './CartDrawer.module.css'

type Props = {
  cart: Record<string, number>
  products: Product[]
  onChangeQuantity: (id: string, change: number) => void
  onClose: () => void
}

export function CartDrawer({ cart, products, onChangeQuantity, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [delivery, setDelivery] = useState('Entrega')
  const selected = products.filter((product) => cart[product.id])
  const total = selected.reduce((sum, product) => sum + product.price * cart[product.id], 0)

  useEffect(() => {
    const dialog = dialogRef.current
    dialog?.showModal()
    return () => dialog?.close()
  }, [])

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const address = String(data.get('address') || '').trim()
    const addressField = form.elements.namedItem('address')
    if (delivery === 'Entrega' && addressField instanceof HTMLTextAreaElement) {
      addressField.setCustomValidity(address ? '' : 'Ingresa una dirección de entrega.')
      if (!addressField.reportValidity()) return
    }

    const notes = String(data.get('notes') || '').trim()
    const lines = [
      '¡Hola! Me gustaría hacer un pedido:',
      '',
      `*Nombre:* ${name}`,
      '*Productos:*',
      ...selected.map((product) => `• ${cart[product.id]} x ${product.name} (${formatPrice(product.price)} c/u)`),
      `*Subtotal de referencia:* ${formatPrice(total)}`,
      `*Pago:* ${data.get('payment')}`,
      `*Entrega:* ${delivery}`,
      ...(delivery === 'Entrega' ? [`*Dirección:* ${address}`] : []),
      ...(notes ? [`*Indicaciones:* ${notes}`] : []),
      '',
      'Por favor, confirmen disponibilidad, precio y entrega. ¡Gracias!',
    ]
    window.open(`${whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.drawer}
      aria-labelledby="cart-title"
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
    >
      <div className={styles.heading}>
        <div><div className={styles.eyebrow}>CASI LISTO</div><h2 id="cart-title">Tu pedido<span>.</span></h2></div>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar pedido">×</button>
      </div>
      {selected.length === 0 ? (
        <div className={styles.empty}>
          <span>♡</span><h3>Tu pedido está vacío</h3>
          <p>Agrega tus delicias favoritas para comenzar.</p>
          <button type="button" className={styles.explore} onClick={() => { onClose(); document.getElementById('productos')?.scrollIntoView() }}>Explorar productos →</button>
        </div>
      ) : (
        <form onSubmit={submitOrder} className={styles.form}>
          <div>
            {selected.map((product) => (
              <div className={styles.item} key={product.id}>
                <img src={imagePath(product.image)} alt="" />
                <div className={styles.itemDetails}>
                  <strong>{product.name}</strong><small>{formatPrice(product.price)} c/u</small>
                  <div className={styles.quantity}>
                    <button type="button" onClick={() => onChangeQuantity(product.id, -1)} aria-label={`Quitar una unidad de ${product.name}`}>−</button>
                    <span>{cart[product.id]}</span>
                    <button type="button" onClick={() => onChangeQuantity(product.id, 1)} aria-label={`Agregar una unidad de ${product.name}`}>+</button>
                  </div>
                </div>
                <strong>{formatPrice(product.price * cart[product.id])}</strong>
              </div>
            ))}
          </div>
          <div className={styles.subtotal}><span>Subtotal de referencia</span><strong>{formatPrice(total)}</strong></div>
          <p className={styles.note}>Confirmaremos precios y disponibilidad por WhatsApp.</p>
          <label>Tu nombre<input name="name" required maxLength={100} placeholder="¿Cómo te llamas?" pattern=".*\S.*" title="Ingresa tu nombre" /></label>
          <div className={styles.formRow}>
            <label>Método de entrega<select value={delivery} onChange={(event) => setDelivery(event.target.value)}><option>Entrega</option><option>Retiro</option></select></label>
            <label>Método de pago<select name="payment" required><option>SINPE móvil</option><option>Efectivo</option></select></label>
          </div>
          {delivery === 'Entrega' && <label>Dirección de entrega<textarea name="address" required maxLength={500} placeholder="Tu dirección en Cartago o alrededores" onInput={(event) => event.currentTarget.setCustomValidity('')} /></label>}
          <label>Indicaciones especiales <span>(opcional)</span><textarea name="notes" maxLength={500} placeholder="Cuéntanos cualquier detalle" /></label>
          <button type="submit" className={styles.whatsapp}>Continuar a WhatsApp <span>↗</span></button>
          <p className={`${styles.note} ${styles.center}`}>Revisa y envía el mensaje en WhatsApp para completar tu solicitud.</p>
        </form>
      )}
    </dialog>
  )
}
