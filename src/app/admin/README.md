# TP Electric Admin System

## 登录信息
- **用户名**: `tpelectric`
- **密码**: `Tpc1969.08.13`

## 功能说明

### 1. 登录系统
- 访问 `/admin/login` 或点击导航栏中的 "Admin" 按钮
- 使用上述用户名和密码登录

### 2. 产品管理
- **新产品管理** (`/admin/products/new`): 添加、编辑、删除新产品
- **二手产品管理** (`/admin/products/used`): 管理二手电器
- **零件管理** (`/admin/products/parts`): 管理配件和零件

### 3. 内容管理
- **内容编辑** (`/admin/content`): 编辑网站内容，包括标题、描述、联系信息等

### 4. 数据持久化
- 所有产品数据保存在浏览器的 localStorage 中
- 数据会在页面刷新后保持
- 客户只能查看产品，无法编辑

## 使用步骤

1. **登录管理后台**
   - 点击导航栏中的 "Admin" 按钮
   - 输入用户名和密码

2. **管理产品**
   - 在仪表板中选择要管理的产品类别
   - 点击 "Add New Product" 添加新产品
   - 点击 "Edit" 编辑现有产品
   - 点击 "Delete" 删除产品

3. **编辑网站内容**
   - 在仪表板中点击 "Content Management"
   - 点击 "Edit Content" 开始编辑
   - 修改完成后点击 "Save Changes"

4. **查看网站**
   - 在仪表板中点击 "View Website" 查看公开网站
   - 或直接访问首页查看效果

## 注意事项

- 所有更改会立即保存到 localStorage
- 客户只能看到产品信息，无法进行编辑
- 图片路径需要手动输入，格式为 `/images/filename.jpg`
- 建议定期备份重要的产品数据 