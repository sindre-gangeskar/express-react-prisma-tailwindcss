module.exports = (err, req, res, next) => {
  console.error(err);
  const accept = checkHeader(req);

  switch (accept) {
    case 'application/json': {
      if (err.statusCode !== 500)
        return res.status(err.statusCode).jsend.fail({ statusCode: err.statusCode, message: err.message ?? 'An unknown error has occurred' });

      return res.status(500).jsend.error({ statusCode: 500, message: 'An internal server error has occurred', data: null });
    }
    case 'text/html': {
      console.log(err)
      if (err.statusCode === 401) return res.status(err.statusCode).render('login', { state: { message: err.message } });
      if (err.statusCode === 404) return res.status(err.statusCode).render('notFound');
    }
    default: {
      return res.status(500).render('error', { error: { statusCode: err.statusCode, message: err.message, stack: err.stack } })
    }
  }
}

function checkHeader(req) {
  const header = req.headers[ 'accept' ];
  if (header && header.includes('application/json')) return 'application/json';
  else return 'text/html';
}