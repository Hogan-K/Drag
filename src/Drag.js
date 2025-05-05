/*
How to use:
params : {
  必要:
   main_el: 拖曳主體 - element
  選用:
   area_el: 拖曳範圍 - element (default: null)
   top_boundary: 拖曳範圍內自訂上限 - Number (default: 0)
   bottom_boundary: 拖曳範圍內自訂下限 - Number (default: 0)
   right_boundary: 拖曳範圍內自訂右限 - Number (default: 0)
   left_boundary: 拖曳範圍內自訂左限 - Number (default: 0)
}

description:
  主體須自行設置 position 和初始定位點，該功能只處理拖曳賦予新定位點,
  該功能使用 bottom、right 為設定定位點的值, 非 top、left, 如需修改功能請將邏輯顛倒
*/
export default function ({main_el, top_boundary = 0, bottom_boundary = 0, right_boundary = 0, left_boundary = 0, area_el = null}) {
    const onMove = (e) => {
        const main_el_boundary = main_el.getBoundingClientRect()
        const area_range_boundary = area_el ? area_el.getBoundingClientRect() : null

        let last_position_X = area_range_boundary ? area_range_boundary.right : window.innerWidth, // X 軸最大值
            last_position_Y = area_range_boundary ? area_range_boundary.bottom : window.innerHeight, // Y 軸最大值
            position_X = last_position_X - main_el_boundary.right, // 計算目前 X 軸的值
            position_Y = last_position_Y - main_el_boundary.bottom, // 計算目前 Y 軸的值
            // 拖曳範圍
            area_range_left = area_range_boundary ? last_position_X - area_range_boundary.left - left_boundary : window.innerWidth,
            area_range_top = area_range_boundary ? last_position_Y - area_range_boundary.top - top_boundary : window.innerHeight,
            area_range_bottom = bottom_boundary,
            area_range_right = right_boundary,
            // 主體高寬
            element_height = main_el_boundary.height,
            element_width = main_el_boundary.width

        // 清除 top、left 避免影響 right、bottom 定位
        main_el.style.top = 'auto'
        main_el.style.left = 'auto'

        // 拖曳範圍
        const boundary_Y =
                (position_Y < area_range_top - element_height || e.movementY >= 0) &&
                (position_Y > area_range_bottom || e.movementY <= 0),
            boundary_X =
                (position_X > area_range_right || e.movementX <= 0) && (position_X + element_width < area_range_left || e.movementX >= 0)

        // 修改主體的定位點
        if (boundary_Y) {
            main_el.style.bottom = `${position_Y - e.movementY}px`
        }
        if (boundary_X) {
            main_el.style.right = `${position_X - e.movementX}px`
        }
    }
    const stopMove = () => {
        document.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerup', stopMove)
        main_el.removeEventListener('pointerleave', stopMove)
    }
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', stopMove)
    main_el.addEventListener('pointerleave', stopMove)
}
