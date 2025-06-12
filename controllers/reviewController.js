const { reviewCode } = require('../services/openRouterService');

exports.getReview = async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(422).json({ error: 'Code is required!' });
        }

        const review = await reviewCode(code);
        res.status(200).json({ review });
    } catch (error) {
        console.error("Error in getReview Controller:", error);
        res.status(500).json({ 
            error: 'Internal Server Error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined 
        });
    }
};
