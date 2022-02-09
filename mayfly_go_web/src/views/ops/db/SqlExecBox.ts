import { h, render, VNode } from 'vue'
import SqlExecDialog from './SqlExecDialog.vue'

export type SqlExecProps = {
    sql: string
    dbId: number,
    runSuccessCallback?: Function,
    cancelCallback?: Function
}

const boxId = 'Sql-Exec-ID'

const renderBox = (): VNode => {
    const props: SqlExecProps = {
        sql: '',
        dbId: 0,
    } as any
    const container = document.createElement('div')
    container.id = boxId
    // 创建 虚拟dom
    const boxVNode = h(SqlExecDialog, props)
    // 将虚拟dom渲染到 container dom 上
    render(boxVNode, container)
    // 最后将 container 追加到 body 上
    document.body.appendChild(container)

    return boxVNode
}

let boxInstance: any

const SqlExecBox = (props: SqlExecProps): void => {
    if (boxInstance) {
        const boxVue = boxInstance.component
        // 调用open方法显示弹框
        boxVue.proxy.open(props);
    } else {
        boxInstance = renderBox()
        SqlExecBox(props)
    }
}

export default SqlExecBox;