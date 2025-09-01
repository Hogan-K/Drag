/*
How to use:
params : {
  必要:
   main_el: 拖曳主體 - element
  選用:
   trigger_el: 觸發拖曳的元素 - element
   top_boundary: 拖曳範圍(上) - Number (default: 0)
   bottom_boundary: 拖曳範圍(下) - Number (default: window.innerHeight)
   left_boundary: 拖曳範圍(左) - Number (default: 0)
   right_boundary: 拖曳範圍(右) - Number (default: window.innerWidth)
}

description:
  主體須自行設置 position 和初始定位點，該功能只處理拖曳賦予新定位點
*/
export default function (info) {
    const trigger_el = info.trigger_el ?? info.main_el // 觸發拖曳的 element
    const main_el = info.main_el // 拖曳的主體 element

    main_el.style.willChange = 'transform'
    main_el.style.touchAction = 'none'
    main_el.style.userSelect = 'none'

    let w = 0,
        h = 0,
        x = 0,
        y = 0 // 儲存要移動的距離
    let minX = 0,
        minY = 0,
        maxX = 0,
        maxY = 0 // 可移動的最外圍
    let lastClientX = 0,
        lastClientY = 0 // 存儲游標的新位置
    const origin_location = {clientX: 0, clientY: 0} // 儲存現在游標的位置
    let dragging = false
    let rafId = null
    let pending = false // rAF 節流旗標
    let transform_center_point = null // 移動的基準點

    // 移動元素
    const applyTransform = () => {
        main_el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    // 檢查移動是否超過邊界
    const clamp = () => {
        if (x < minX) x = minX
        if (y < minY) y = minY
        if (x > maxX) x = maxX
        if (y > maxY) y = maxY
    }

    const onMove = (e) => {
        // 儲存最後一次指標位置；由 rAF 消化
        lastClientX = e.clientX
        lastClientY = e.clientY

        if (!pending) {
            pending = true
            rafId = requestAnimationFrame(() => {
                pending = false

                // 計算相對移動（與上次 move 事件的座標相比）
                const dx = lastClientX - origin_location.clientX
                const dy = lastClientY - origin_location.clientY
                origin_location.clientX = lastClientX
                origin_location.clientY = lastClientY

                x += dx
                y += dy
                clamp()
                applyTransform()
            })
        }
    }

    const onDown = (e) => {
        const rect = main_el.getBoundingClientRect()
        w = rect.width
        h = rect.height
        x = rect.x
        y = rect.y

        // 首次需設定 transform 基準點，拖曳邊界
        if (!transform_center_point) {
            transform_center_point = {
                x: rect.x,
                y: rect.y,
            }
            minX = (info.left_boundary ?? 0) - transform_center_point.x
            minY = (info.top_boundary ?? 0) - transform_center_point.y
            maxX = (info.right_boundary ?? window.innerWidth) - w - transform_center_point.x
            maxY = (info.bottom_boundary ?? window.innerHeight) - h - transform_center_point.y
        }

        // 以首次設定的 transform 為基準點
        origin_location.clientX = e.clientX + transform_center_point.x
        origin_location.clientY = e.clientY + transform_center_point.y

        dragging = true

        // 確保後續事件都回來
        main_el.setPointerCapture?.(e.pointerId)

        document.addEventListener('pointermove', onMove, {passive: true})
        document.addEventListener('pointerup', onUp)
        document.addEventListener('pointercancel', onUp)
    }

    const onUp = () => {
        if (!dragging) return
        dragging = false

        document.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerup', onUp)
        document.removeEventListener('pointercancel', onUp)

        if (rafId) {
            cancelAnimationFrame(rafId)
            rafId = null
            pending = false
        }
    }

    trigger_el.addEventListener('pointerdown', onDown)
}
