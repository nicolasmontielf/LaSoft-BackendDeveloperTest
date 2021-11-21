const response = (_: any, res: any, next: any) => {
    res.response = function (code: number, wasSuccess: boolean, message?: string, data?: any) {
        return res
        .status(code)
        .json({
            success: wasSuccess,
            data: data,
            message: message
        })
    }
    next();
}

export default response;