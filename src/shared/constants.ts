const SAP_M_TAGS = {
        H1: "<Title level='H1'>",
        H2: "<Title level='H2'>",
        H4: "<Title level='H4'>",
        H5: "<Title level='H5'>",
        H6: "<Title level='H6'>",
        P: "<Text>",
        UL: "<List>",
        OL: "<List>",
        LI: "<StandardListItem>",
        STRONG: "<Text class='bold'>",
        EM: "<Text class='italic'>",
        S: "<Text class='strikethrough'>",
        BLOCKQUOTE: "<FormattedText htmlText='{text}'/>",
        HR: "<ToolBar width='100%' height='1px'/>",
    }, 
    SAP_UI_CODEEDITOR_TAGS = {
        CODE: "<code:CodeEditor editable='false' lineNumbers='false' language={language} value={text}>",
        PRE: "",
    },
    SAP_UI_TABLE_TAGS = {
        TABLE: "<table:Table>",
        THEAD: "<table:Column>",
        TBODY: "<table:Row>",
        TR: "<table:Row>",
        TD: "<table:ColumnListItem>",
        TH: "<table:Column header='Header'>",
    };

export default {
    SAP_M_TAGS,
    SAP_UI_CODEEDITOR_TAGS,
    SAP_UI_TABLE_TAGS,
}