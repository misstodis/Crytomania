<div class="modal fade" id="modal-add-coin">
    <div class="modal-dialog bg-light">
        <div class="modal-content ">
            <div class="modal-header border-0">
                <h5 class="modal-title">Adding coin</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">
                <div class=" p-5 shadow ">
                    <!-- Login Form -->
                    <form id="add-coin-form">
                        <div class="mb-1 form-group">
                            <div class="input-group ">
                                <input type="number" class="form-control" id="amount-coins" name="amountCoin" placeholder="Amount of coins" min="0" value="0" step="any">
                                <span class="input-group-text text-capitalize" id="coin-addon">coinaddon</span>
                            </div>
                            <span class="form-text text-start form-message"></span>
                        </div>
                        <div>
                            <i class="bi bi-arrow-down-up"></i>
                        </div>
                        <div class="form-group mt-1">
                            <div class="input-group ">
                                <input type="number" class="form-control" id="amount-money" name="amountMoney" placeholder="Amount of Money" min="0" value="0" step="any">
                                <span class="input-group-text" id="money-addon">Dollar</span>
                            </div>
                            <span class="form-text text-start form-message"></span>
                        </div>
                        <button type="submit" class="btn btn-primary w-100 my-3 shadow form-submit">Add</button>
                    </form>
                    <!-- Login Form -->
                </div>
            </div>
        </div>
    </div>
</div>